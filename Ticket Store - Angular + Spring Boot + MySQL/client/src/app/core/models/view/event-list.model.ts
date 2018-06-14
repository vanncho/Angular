import { Category } from './category.model';

export class EventListModel {

    constructor(
        public id: number,
        public title: string,
        public location: string,
        public details: string,
        public categories: Array<Category>
    ) {}
}
