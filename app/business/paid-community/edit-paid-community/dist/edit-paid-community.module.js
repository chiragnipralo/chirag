"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditPaidCommunityPageModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var edit_paid_community_routing_module_1 = require("./edit-paid-community-routing.module");
var edit_paid_community_page_1 = require("./edit-paid-community.page");
var EditPaidCommunityPageModule = /** @class */ (function () {
    function EditPaidCommunityPageModule() {
    }
    EditPaidCommunityPageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                angular_1.IonicModule,
                edit_paid_community_routing_module_1.EditPaidCommunityPageRoutingModule
            ],
            declarations: [edit_paid_community_page_1.EditPaidCommunityPage]
        })
    ], EditPaidCommunityPageModule);
    return EditPaidCommunityPageModule;
}());
exports.EditPaidCommunityPageModule = EditPaidCommunityPageModule;
