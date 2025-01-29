import {SimpleQueryFn} from "./IQueryArg";
import {createDirectionQuery} from "./impl/createDirectionQuery";

export const parents: SimpleQueryFn = createDirectionQuery('parents', by => by.parentElement);

export const nextAll: SimpleQueryFn = createDirectionQuery('nextAll', by => by.nextElementSibling);

export const prevAll: SimpleQueryFn = createDirectionQuery('prevAll', by => by.previousElementSibling);