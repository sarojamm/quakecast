import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveformViewerComponent } from './waveform-viewer.component';

describe('WaveformViewerComponent', () => {
  let component: WaveformViewerComponent;
  let fixture: ComponentFixture<WaveformViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaveformViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaveformViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
