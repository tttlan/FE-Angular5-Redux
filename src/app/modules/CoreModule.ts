import { NgModule } from '@angular/core';
import * as fromAngularForms from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// import core containers
import { NotFoundComponent } from '../containers/not-found/NotFoundPageComponent';

// import core components
import { ShowErrorsComponent } from '../components/ShowErrorsComponent';
import { LayoutComponent } from '../components/LayoutComponent';

// import core directives
import { InputPatternValidatorDirective } from '../shared/directives/input-pattern-validator.directive';
import { PassWordPatternValidatorDirective } from '../shared/directives/password-validator.directive';

// import another modules
import { CustomMaterialModule } from '../modules/MaterialModule';

const CORE_COMPONENTS = [
    ShowErrorsComponent,
    LayoutComponent,
    NotFoundComponent,
    InputPatternValidatorDirective,
    PassWordPatternValidatorDirective
];

@NgModule({
    declarations: CORE_COMPONENTS,
    imports: [
        CommonModule,
        RouterModule,
        fromAngularForms.FormsModule,
        fromAngularForms.ReactiveFormsModule,
        CustomMaterialModule
    ],
    exports: CORE_COMPONENTS
})
export class CoreModule {
    static forRoot() {
        return {
            ngModule: CoreModule,
            providers: []
        };
    }
}
