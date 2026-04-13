import { IItemData } from './IItemData';

export interface IItem {
	id?: string;
	_renderer?: Function;
	canBeAnchor?: boolean;
	data?: IItemData;
	sortIndex?: string;
}
