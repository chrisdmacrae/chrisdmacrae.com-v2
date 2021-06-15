export * from './Stack';
export * from './StackItem';
import { Stack as StackComponent } from './Stack';
import { StackItem } from './StackItem';

export const Stack = StackComponent as typeof StackComponent & { Item: typeof StackItem };
Stack.Item = StackItem;