import { Reference } from "./reference";
import { User } from "./user";

export interface Recomendation {
    id: number,
    title: string,
    text: string,
    user: User,
    categories: [number]
    references: [Reference]
}