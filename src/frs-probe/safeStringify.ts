/**
 * 安全序列化任意对象（特别针对 React/Fiber/Store 等复杂运行时对象）。
 *
 * 设计目标：
 * 1. 尽可能获取可安全访问的值
 * 2. getter 可执行则获取值，否则记录错误
 * 3. 无法获取值时，退化为类型或结构信息
 * 4. 避免循环引用导致崩溃
 * 5. 不依赖特定框架（React / Zustand / Redux 等）
 *
 * 注意：
 * - 某些 getter（如 React Context / Store）在非 Provider 环境下访问会抛错
 * - 本函数会捕获这些异常，并记录为字符串标记
 * - 不保证获取完整真实数据（部分运行时对象本质不可序列化）
 */
export interface SafeStringifyOptions {
	/**
	 * 最大递归深度（默认：Infinity）
	 * 用于防止极深层嵌套对象导致性能问题
	 */
	maxDepth?: number

	/**
	 * 每层最多遍历的 key 数量（默认：Infinity）
	 * 用于限制大对象遍历成本
	 */
	maxKeys?: number

	/**
	 * JSON.stringify 的缩进（默认：2）
	 */
	space?: number
}

/**
 * 安全 JSON.stringify，支持循环引用、getter、防异常访问
 *
 * @param input 任意对象
 * @param options 配置项
 * @returns string
 */
export function safeStringify(
	input: unknown,
	options: SafeStringifyOptions = {}
): string {
	const {
		maxDepth = 10,
		maxKeys = Infinity,
		space = 2,
	} = options

	const seen = new WeakSet<object>()

	function getType(v: unknown): string {
		if (v === null) return 'null'
		if (Array.isArray(v)) return 'array'
		return typeof v
	}

	function walk(value: unknown, depth: number): unknown {
		// 基础类型直接返回
		if (
			value === null ||
			typeof value === 'string' ||
			typeof value === 'number' ||
			typeof value === 'boolean'
		) {
			return value
		}

		if (typeof value !== 'object') {
			return `[${typeof value}]`
		}

		// 循环引用
		if (seen.has(value as object)) {
			return '[Circular]'
		}

		// 深度限制
		if (depth > maxDepth) {
			return '[MaxDepth]'
		}

		seen.add(value as object)

		const result: Record<PropertyKey, unknown> = {}

		let keys: PropertyKey[]
		try {
			keys = Reflect.ownKeys(value as object)
		} catch {
			return '[UnreachableObject]'
		}

		keys = keys.slice(0, maxKeys)

		for (const key of keys) {
			let desc: PropertyDescriptor | undefined

			try {
				desc = Object.getOwnPropertyDescriptor(value as object, key)
			} catch {
				result[key] = '[NoDescriptor]'
				continue
			}

			if (!desc) {
				result[key] = '[NoDescriptor]'
				continue
			}

			// ---------- 普通 value ----------
			if ('value' in desc) {
				const v = desc.value

				if (
					v === null ||
					typeof v === 'string' ||
					typeof v === 'number' ||
					typeof v === 'boolean'
				) {
					result[key] = v
					continue
				}

				if (typeof v === 'function') {
					result[key] = '[Function]'
					continue
				}

				if (typeof v === 'object') {
					result[key] = walk(v, depth + 1)
					continue
				}

				result[key] = `[${getType(v)}]`
				continue
			}

			// ---------- getter ----------
			if (desc.get) {
				try {
					const v = desc.get.call(value)

					if (
						v === null ||
						typeof v === 'string' ||
						typeof v === 'number' ||
						typeof v === 'boolean'
					) {
						result[key] = v
					} else if (typeof v === 'object') {
						result[key] = walk(v, depth + 1)
					} else {
						result[key] = `[${getType(v)}]`
					}
				} catch (e: any) {
					result[key] = `[GetterThrows: ${e?.message || 'error'}]`
				}

				continue
			}

			result[key] = '[UnknownDescriptor]'
		}

		return result
	}

	try {
		return JSON.stringify(walk(input, 0), null, space)
	} catch (e: any) {
		return JSON.stringify(
			{
				error: 'stringify_failed',
				message: e?.message,
			},
			null,
			space
		)
	}
}
