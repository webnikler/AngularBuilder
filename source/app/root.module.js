import rootConfig from './root.config';
import rootComponent from './root.component';
import components from './components/components.module';
import common from './common/common.module';

const libs = ['ngMaterial'];

angular
  .module('root', [
    ...libs,
    components,
    common
  ])
  .component('root', rootComponent)
  .config(rootConfig);