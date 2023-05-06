import { is } from '@utils';
import merge from 'lodash/merge'
const config = {
  base:{
    main:{

    },
    renderer:{},
    preload:{},
  },
  dev:{
    main:{},
    renderer:{},
    preload:{},
  },
  prod: {
    main:{},
    renderer:{},
    preload:{},
  }
}


const getConfig = () => {
  if(is.dev){
    return merge(config.base, config.dev)
  }
  return merge(config.base, config.prod)
}

export default getConfig()
