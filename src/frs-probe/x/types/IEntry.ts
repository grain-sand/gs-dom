import { IItemMetadata } from './IItemMetadata';
import { IContent } from './IContent';

export interface IEntry {
	type?: string;
	entryId?: string;
	sortIndex?: string;
	itemMetadata?: IItemMetadata;
	dispensable?: any;
	treeDisplay?: any;
	pill_group?: any;
	content?: any | IContent;
	shouldCountTowardsAdSpacing?: boolean | any;
	position?: number;
}
