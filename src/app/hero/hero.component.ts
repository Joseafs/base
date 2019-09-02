import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HeroService } from '../services/heroes.service';
import { Subscription } from 'rxjs';
import { Hero } from '../services/hero';

@Component({
    selector: 'app-list',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css']
    })
export class HeroComponent implements OnInit, OnDestroy {

    title = 'List ok';
    uBase = '';
    pgtSearch = '';
    pgtPage = 0;
    pgtLimit = 10;
    pgtCount = 0;
    pgtCountPg = 0;

    list: Hero[] = [];
    unsub: Subscription;
    constructor(private service: HeroService) { }

    ngOnInit() {
        this.getHeroes();
    }

    ngOnDestroy() {
        this.unsub.unsubscribe();
    }

    getHeroes() {
        if(this.unsub){
            this.unsub.unsubscribe();
        }

        this.unsub = this.service.getHeroes(this.pgtLimit, this.pgtPage, this.pgtSearch)
            .subscribe(result => {
                this.list = result.data;
                this.pgtCount = result.count;
                this.pgtCountPg = Math.ceil(Number(this.pgtCount) / Number(this.pgtLimit));
        });
    }

    onPageClick(page: number){
        this.pgtPage = page;
        this.getHeroes();
    }
    onLimit(i) {
        this.pgtLimit = i.target.value;
        this.getHeroes();
    }

    search(i) {
        this.pgtSearch = i.target.value;
        this.getHeroes();
    }

    submitOff(e){
        e.prevendDefault();
    }
}
