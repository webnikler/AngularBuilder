import rootConfig from './root.config';
import rootComponent from './root.component';
import components from './components/components.module';
import common from './common/common.module';

angular
  .module('root', [
    components,
    common
  ])
  .component('root', rootComponent)
  .config(rootConfig);