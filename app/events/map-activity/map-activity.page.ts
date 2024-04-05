import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-map-activity',
  templateUrl: './map-activity.page.html',
  styleUrls: ['./map-activity.page.scss'],
})
export class MapActivityPage implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: false })
  canvas!: ElementRef;
  activeButton: string = '';
  markers: Marker[] = [];
  //highlightMarker: (buttonType: string) => void; // Define highlightMarker as a property

  constructor(
    public modalController: ModalController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.initializeMarkers();
  }

  async closeModal() {
    await this.modalController.dismiss({
      'dismissed': true,
    });
  }

  initializeMarkers() {
    this.markers = [
      new Marker('exit', 'http://www.clker.com/cliparts/w/O/e/P/x/i/map-marker-hi.png'),
      new Marker('toilets', 'https://cdn-icons-png.flaticon.com/512/8/8162.png'),
      new Marker('parking', 'https://cdn-icons-png.flaticon.com/512/8/8206.png'),
      new Marker('food', 'https://cdn-icons-png.flaticon.com/512/8/8140.png')
    ];
  }

  highlightMarker(buttonType: string) {
    this.markers.forEach(marker => {
      marker.Zoomed = marker.Type === buttonType;
    });
  }


  isActiveButton(buttonType: string): boolean {
    return this.activeButton === buttonType;
  }

  selectButton(buttonType: string) {
    this.activeButton = buttonType;
    this.highlightMarker(buttonType);
  }

  ngAfterViewInit() {
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    // Map sprite
    const mapSprite = new Image();
    mapSprite.src = 'https://res.cloudinary.com/simplotel/image/upload/q_80,fl_progressive,w_1500,f_auto,c_limit/water-kingdom/WK_MAP_Final-1_q44qmu.jpg';

    const mouseClicked = async (mouse: { x: number; y: number; }) => {
      // Get correct mouse coords
      const rect = canvas.getBoundingClientRect();
      const mouseXPos = mouse.x - rect.left;
      const mouseYPos = mouse.y - rect.top;

      console.log('Marker added');

      // Prompt user for marker data using AlertController
      const alert = await this.alertController.create({
        header: 'Add New Marker',
        inputs: [
          {
            name: 'data',
            type: 'text',
            placeholder: 'Enter data',
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'OK',
            handler: (data) => {
              const marker = new Marker('custom', 'http://www.clker.com/cliparts/w/O/e/P/x/i/map-marker-hi.png');
              marker.XPos = mouseXPos - marker.Width / 2;
              marker.YPos = mouseYPos - marker.Height;
              marker.Data = data.data;
              this.markers.push(marker);
            }
          }
        ]
      });

      await alert.present();
    };

    // Add mouse click event listener to canvas
    canvas.addEventListener('mousedown', mouseClicked, false);

    const firstLoad = () => {
      context.font = '22px Montserrat';
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
      context.drawImage(mapSprite, 0, 0, 900, 900);

      // Draw markers
      for (let i = 0; i < this.markers.length; i++) {
        const tempMarker = this.markers[i];

        // Calculate marker size and position based on zoomed state
        let markerWidth = tempMarker.Width;
        let markerHeight = tempMarker.Height;
        let markerXPos = tempMarker.XPos;
        let markerYPos = tempMarker.YPos;
        if (tempMarker.Zoomed) {
          markerWidth *= 1.5; // Increase marker width by 50% when zoomed
          markerHeight *= 1.5; // Increase marker height by 50% when zoomed
          markerXPos -= (markerWidth - tempMarker.Width) / 2; // Adjust X position to center the marker
          markerYPos -= (markerHeight - tempMarker.Height); // Adjust Y position to align the bottom of the marker
        }

        // Draw marker
        if (tempMarker.Zoomed) {
          // Draw highlighted marker
          context.beginPath();
          context.arc(markerXPos + markerWidth / 2, markerYPos + markerHeight, 10, 0, Math.PI * 2);
          context.fillStyle = 'red';
          context.fill();
          context.closePath();

          // Display zoomed data
          const zoomedText = `Zoomed Data: ${tempMarker.Data}`;
          context.fillStyle = '#000';
          context.font = '16px Montserrat';
          context.textAlign = 'center';
          context.fillText(zoomedText, markerXPos + markerWidth / 2, markerYPos + markerHeight + 20);
        } else {
          // Draw normal marker
          context.drawImage(
            tempMarker.Sprite,
            markerXPos,
            markerYPos,
            markerWidth,
            markerHeight
          );
        }

        // Calculate marker text
        const markerText = `Data: ${tempMarker.Data}`;

        // Draw a simple box so you can see the position
        const textMeasurements = context.measureText(markerText);
        context.fillStyle = 'rgba(255, 255, 255, 0.7)';
        context.fillRect(
          markerXPos - textMeasurements.width / 2,
          markerYPos - 15,
          textMeasurements.width,
          20
        );

        // Draw position text
        context.fillStyle = '#000';
        context.fillText(markerText, markerXPos, markerYPos);
      }
    };

    setInterval(main, 1000 / 60); // Refresh 60 times a second
  }
}

class Marker {
  Sprite: HTMLImageElement;
  Width: number;
  Height: number;
  XPos: number;
  YPos: number;
  Data: string;
  Type: string;
  Highlighted: boolean;
  ImageLoaded: boolean;
  Zoomed: boolean;

  constructor(type: string, spriteUrl: string) {
    this.Sprite = new Image();
    this.Width = 14;
    this.Height = 24;
    this.XPos = 0;
    this.YPos = 0;
    this.Data = '';
    this.Type = type;
    this.Highlighted = false;
    this.ImageLoaded = false;
    this.Zoomed = false;
    this.Sprite.onload = () => {
      this.ImageLoaded = true;
    };

    this.Sprite.onerror = () => {
      console.error(`Failed to load image: ${spriteUrl}`);
      this.ImageLoaded = false;
    };

    this.Sprite.src = spriteUrl;
  }
}

