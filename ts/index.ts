interface VNodeData {
  props?: Props
  attrs?: Attrs
  class?: Classes
  style?: VNodeStyle
  dataset?: Dataset
  on?: On
  attachData?: AttachData
  hook?: Hooks
  key?: Key
  ns?: string // for SVGs
  fn?: () => VNode // for thunks
  args?: any[] // for thunks
  is?: string // for custom elements v1
  [key: string]: any // for any other 3rd party module
}

export interface VNode {
  sel: string | undefined
  data: VNodeData | undefined
  children: Array<VNode | string> | undefined
  elm: Node | undefined
  text: string | undefined
  key: Key | undefined
}

export type Key = string | number | symbol

export type PreHook = () => any
export type InitHook = (vNode: VNode) => any
export type CreateHook = (emptyVNode: VNode, vNode: VNode) => any
export type InsertHook = (vNode: VNode) => any
export type PrePatchHook = (oldVNode: VNode, vNode: VNode) => any
export type UpdateHook = (oldVNode: VNode, vNode: VNode) => any
export type PostPatchHook = (oldVNode: VNode, vNode: VNode) => any
export type DestroyHook = (vNode: VNode) => any
export type RemoveHook = (vNode: VNode, removeCallback: () => void) => any
export type PostHook = () => any
//Partial  部分属性
export type Module = Partial<{
  pre: PreHook
  create: CreateHook
  update: UpdateHook
  destroy: DestroyHook
  remove: RemoveHook
  post: PostHook
}>

type ArraysOf<T> = {
  [K in keyof T]: Array<T[K]>
}
//   Required  必须是完成的属性
type ModuleHooks = ArraysOf<Required<Module>>

const hooks: Array<keyof Module> = [
  'create',
  'update',
  'remove',
  'destroy',
  'pre',
  'post'
]
