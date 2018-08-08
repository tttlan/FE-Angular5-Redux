import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from '../../../services/modal.service';

@Component({
    moduleId: module.id,
    selector: 'app-modal',
    templateUrl: './modal.component.html'
})

export class ModalComponent implements OnInit, OnDestroy {
    @Input() bodyText: string;
    @Input() id: string;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        let modal = this;

        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }
        
        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', function (e: any) {
            if (e.target.className === 'modal') {
                modal.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        // this.element.style.display = 'block';
        // document.body.classList.add('modal-open');
        this.element.firstElementChild.style.display = "block";
        document.getElementById('exampleModalCenter').classList.add('show');
        document.getElementById('modal-backdrop').classList.add('show');
        document.getElementById('modal-backdrop').style.display = "block";
    }

    // close modal
    close(): void {
        // this.element.style.display = 'none';
        // document.body.classList.remove('modal-open');
        this.element.firstElementChild.style.display = "none";
        document.getElementById('exampleModalCenter').classList.remove('show');
        document.getElementById('modal-backdrop').classList.remove('show');
        document.getElementById('modal-backdrop').style.display = "none";
        
    }
}