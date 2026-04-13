import {IReactProps} from "../../react/IReactProps";
import { DisplayType } from './DisplayType';
import { IEntry } from './IEntry';
import { IItem } from './IItem';
import { IModule } from './IModule';

export interface IReactXCellDivProps extends IReactProps<IEntry, IItem, IReactXCellDivProps> {
	displayType?: DisplayType;
	module?: IModule;
	setAPI?: Function;
}

export * from './IReactXCellDivProps'
export * from './IItem'
export * from './IItemData'
export * from './IModule'
export * from './IEntry'
export * from './IContent'
export * from './IItemMetadata'
export * from './IModuleMetadata'
export * from './IClientEventInfo'
export * from './DisplayType'
