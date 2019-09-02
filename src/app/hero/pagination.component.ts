import { Component, Input ,Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
})
export class PaginationComponent {
    private pgMax: number;

    @Input()
    limit: number;

    @Input()
    page: number;

    @Output()
    change = new EventEmitter;

    @Input()
    set max(pgMax: number) {
        this.pgMax = Number(pgMax);

        this.pgLimit = Math.ceil(this.pgMax / this.limit);

        console.log(this.pgLimit);
    }

    windowW: number;
    nMin: number;
    nNext: number;
    nPrev: number;

    nLimit: number;
    

    pgNav: number;
    pgStart: number;
    pgLimit: number;
    
    pgNext: number;
    pgPrev: number;

    arySize = Array();

    ngOnInit(): void {
        this.resize();
    }

    arySync(i){
        var ary = [];
        for (var j = (i - this.nPrev); (j <= (i + this.nNext)); j++) {
            ary.push([j]);
        }
        return ary;
    }

    clicked(i) {

        this.pgNav = Math.floor(this.page);

        let result: number;
        if(i == 'next'){
            result = Number(this.pgNav) + 1;
        } else if(i == 'prev'){
            result = Number(this.pgNav) - 1;
        } else {
            result = Number(i);
        }

        let org = this.arySync(result);
        this.arySize = org;
        this.change.emit(result);
    }

    resize() {
        this.windowW = window.innerWidth;
        if (this.windowW > 763) {
            this.nMin = 3;
            this.nNext = 4;
            this.nPrev = 2;
            this.nLimit = 5;
        } else {
            this.nMin = 1;
            this.nNext = 2;
            this.nPrev = 1;
            this.nLimit = 4;
        }

        let org = this.arySync(Number(this.page));
        this.arySize = org;
    }
}