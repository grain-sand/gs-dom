export interface IGroupedNodes {
	elementNodes: HTMLElement[],
	textNodes: Text[],
	commentNodes: Comment[]
}

export function groupNodes(nodeList: NodeList): IGroupedNodes {
	const elementNodes: HTMLElement[] = [];
	const textNodes: Text[] = [];
	const commentNodes: Comment[] = [];

	for (const node of nodeList as any) {
		switch (node.nodeType) {
			case Node.ELEMENT_NODE:
				elementNodes.push(node);
				break;
			case Node.TEXT_NODE:
				textNodes.push(node);
				break;
			case Node.COMMENT_NODE:
				commentNodes.push(node);
				break;
		}
	}

	return {
		elementNodes,
		textNodes,
		commentNodes
	};
}