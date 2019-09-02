import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { HeroService } from '../../services/heroes.service';
import { Subscription } from 'rxjs';
import { Hero, Relationships, MediaRelation } from '../../services/hero';

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.css']
})
export class HeroInfoComponent implements OnInit, OnDestroy{

  unsub: Subscription;
  unsubRel: Subscription;
  unsubMedia: Subscription;

  constructor(private route: ActivatedRoute, private service: HeroService) { }

  heroID = '';
  heroInfo: Hero[] = [];
  
  heroRelations: Relationships[] = [];
  
  heroMediaRelation: MediaRelation[] = [];

  relationships(relationships: Relationships[]){
    this.heroRelations = relationships;

    let relAry = this.heroRelations;

    for(let i = 0; i < relAry.length; i++){
      this.getMediaRelation(relAry[i].id);
    }
  }
  
  // mediarelation(mediarelation: MediaRelation[]){
  //   console.log('');
  // }

  ngOnInit() {
    this.heroID = this.route.snapshot.paramMap.get('id');
    this.getHero();
    this.getRelationships();
  }
  ngOnDestroy(){
    this.unsub.unsubscribe();
    this.unsubRel.unsubscribe();
    this.unsubMedia.unsubscribe();
  }
  
  getHero() {
    if(this.unsub){
        this.unsub.unsubscribe();
    }

    this.unsub = this.service.getHero(this.heroID)
        .subscribe(result => {
            this.heroInfo = result.data;
    });
  }

  getRelationships() {
    if(this.unsubRel){
      this.unsubRel.unsubscribe();
    }
    this.unsubRel = this.service.getRelationships(this.heroID)
      .subscribe( result => {
          this.relationships(result.data);
      });
  }
  getMediaRelation(id: any) {
    // if(this.unsubMedia){
    //   this.unsubMedia.unsubscribe();
    // }
    this.unsubMedia = this.service.getMediaRelation(id)
      .subscribe( result => {
        this.heroMediaRelation.push(result.data);
        // this.mediarelation();
      });
  }
}
