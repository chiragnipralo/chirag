import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map-activity',
  templateUrl: './map-activity.page.html',
  styleUrls: ['./map-activity.page.scss'],
})
export class MapActivityPage implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss({
      'dismissed': true,
    });
  }

  ngAfterViewInit() {
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    // Map sprite
    const mapSprite = new Image();
    mapSprite.src = 'https://res.cloudinary.com/simplotel/image/upload/q_80,fl_progressive,w_1500,f_auto,c_limit/water-kingdom/WK_MAP_Final-1_q44qmu.jpg';

    const Marker = function () {
      this.Sprite = new Image();
      this.Sprite.src = 'http://www.clker.com/cliparts/w/O/e/P/x/i/map-marker-hi.png';
      this.Width = 14;
      this.Height = 24;
      this.XPos = 0;
      this.YPos = 0;
    };

    const Markers = [];

    const mouseClicked = (mouse) => {
      // Get correct mouse coords
      const rect = canvas.getBoundingClientRect();
      const mouseXPos = mouse.x - rect.left;
      const mouseYPos = mouse.y - rect.top;

      console.log('Marker added');

      // Move the marker when placed to a better location
      const marker = new Marker();
      marker.XPos = mouseXPos - marker.Width / 2;
      marker.YPos = mouseYPos - marker.Height;

      Markers.push(marker);
    };

    // Add mouse click event listener to canvas
    canvas.addEventListener('mousedown', mouseClicked, false);

    const firstLoad = () => {
      context.font = '18px';
      context.textAlign = 'center';
    };

    firstLoad();

    const main = () => {
      draw();
    };

    const draw = () => {
      // Clear Canvas
      context.fillStyle = '#000';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw map
      // Sprite, X location, Y location, Image width, Image height
      // You can leave the image height and width off; if you do, it will draw the image at the default size
      context.drawImage(mapSprite, 0, 0, 900, 900);

      // Draw markers
      for (let i = 0; i < Markers.length; i++) {
        const tempMarker = Markers[i];
        // Draw marker
        context.drawImage(
          tempMarker.Sprite,
          tempMarker.XPos,
          tempMarker.YPos,
          tempMarker.Width,
          tempMarker.Height
        );

        // Calculate position text
        const markerText = `Position (X: ${tempMarker.XPos}, Y: ${tempMarker.YPos}`;

        // Draw a simple box so you can see the position
        const textMeasurements = context.measureText(markerText);
        context.fillStyle = '#666';
        context.globalAlpha = 0.7;
        context.fillRect(
          tempMarker.XPos - textMeasurements.width / 2,
          tempMarker.YPos - 15,
          textMeasurements.width,
          20
        );
        context.globalAlpha = 1;

        // Draw position above
        context.fillStyle = '#000';
        context.fillText(markerText, tempMarker.XPos, tempMarker.YPos);
      }
    };

    setInterval(main, 1000 / 60); // Refresh 60 times a second
  }
}
