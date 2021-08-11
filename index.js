function notice(args) {
  const duration = args.duration !== undefined ? args.duration : defaultDuration
  const iconType = {
    info: 'info-circle',
    success: 'check-circle',
    error: 'close-circle',
    warning: 'exclamation-circle',
    loading: 'loading'
  }[args.type]
  const target = args.key || key++
  const closePromise = new Promise(resolve => {
    const callback = () => {
      if (typeof args.onClose === 'function') {
        args.onClose()
      }
      return resolve(true)
    }
    getMessageInstance(instance => {
      instance.notice({
        key: target,
        duration,
        style: {},
        content: h => {
          const iconNode = (
            <Icon
              type={iconType}
              theme={iconType === 'loading' ? 'outlined' : 'filled'}
            />
          )
          const switchIconNode = iconType ? iconNode : ''
          return (
            <div
              class={`${prefixCls}-custom-content${
                args.type ? ` ${prefixCls}-${args.type}` : ''
              }`}
            >
              {args.icon
                ? typeof args.icon === 'function'
                  ? args.icon(h)
                  : args.icon
                : switchIconNode}
              <span>
                {typeof args.content === 'function'
                  ? args.content(h)
                  : args.content}
              </span>
            </div>
          )
        },
        onClose: callback
      })
    })
  })
  const result = () => {
    if (messageInstance) {
      messageInstance.removeNotice(target)
    }
  }
  result.then = (filled, rejected) => closePromise.then(filled, rejected)
  result.promise = closePromise
  return result
}
