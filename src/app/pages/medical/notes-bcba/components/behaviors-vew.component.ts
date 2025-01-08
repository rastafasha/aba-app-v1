import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-behaviorslist-view',
  template: `
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Behaviors</h4>
      </div>
      <!-- body card -->
      <div class="card-body p-0">
        <div class="personal-list-out">
          <div class="container">
            <div class="col-xs-12">
              <div class="row">
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>behavior1</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="behaviorsList?.behavior1"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!behaviorsList?.behavior1"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>behavior2</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="behaviorsList?.behavior2"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!behaviorsList?.behavior2"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>behavior3</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="behaviorsList?.behavior3"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!behaviorsList?.behavior3"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>behavior4</span>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        *ngIf="behaviorsList?.behavior4"
                        class="fa fa-check"
                      ></i>
                      <i
                        *ngIf="!behaviorsList?.behavior4"
                        class="fa fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class BehaviorViewComponent {
  @Input() behaviorsList;

  updateInterventions() {
    const behaviorsListsObj = this.behaviorsList
      .filter((behaviorsList) => behaviorsList.value)
      .reduce((acc, behaviorsList) => {
        acc[behaviorsList.id] = true;
        return acc;
      }, {});
  }
}
