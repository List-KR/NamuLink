/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/naming-convention */
type TPowerLinkMixin = {
  methods: Record<'contribution_link' | 'contribution_link_discuss' | 'doc_action_link' | 'doc_fulltitle' | 'onDynamicContentClick' | 'openQuickACLGroup' | 'to_duration' | 'url_encode' | 'user_doc' | string, Function>
}

export type TPowerLinkContent = {
  emits: string[]
  components: Record<string, {
    components: {
      FakeImg: {
        computed: Record<string, Function>
        props: Record<string, { type: Function }>
        render: Function
        __cssModules: {
          '$style': {
            'wiki-image': string,
            'wiki-image-wrapper': string,
          },
          __scopeId: string
        },
        NaverLoginImage: string,
        NaverPayImage: string,
        NaverPayPlusImage: string,
        NaverTalkTalkImage: string
      },
      mixins: TPowerLinkMixin[],
      props: Record<string, Function>,
      render: Function,
      __cssModules: {
        '$style': Record<string, string>
        __scopeId: string
      }
    }
  }>
  props: Record<string, Function>,
  render: Function,
  __cssModules: {
    '$style': Record<string, string>
  },
  __scopeId: string
  __v_skip: boolean
}