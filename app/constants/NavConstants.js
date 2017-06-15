import keyMirrorNested from 'keymirror-nested'

const glue = ':'
const prefix = ''

export default keyMirrorNested({
  navigation: null,
  profile: null,
  scene: null,
  schedule: null,
  shift: {
    home: null,
    description: null
  }
}, glue, prefix)
