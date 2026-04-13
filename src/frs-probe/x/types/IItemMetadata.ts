import { IClientEventInfo } from './IClientEventInfo';
import { IModuleMetadata } from './IModuleMetadata';

export interface IItemMetadata {
	clientEventInfo?: IClientEventInfo;
	feedbackInfo?: any;
	reactiveTriggers?: any;
	moduleMetadata?: IModuleMetadata;
}
