import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';

@Component({
    selector: 'page-barcodescanner',
    templateUrl: 'barcodescanner.html'
})
export class BarcodescannerPage {

    public barcodeData;

    constructor(public navCtrl: NavController, public alertCtrl: AlertController) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BarcodescannerPage');
    }

    scan() {

        let options =
            {
                preferFrontCamera: false, // iOS and Android
                showFlipCameraButton: true, // iOS and Android
                showTorchButton: true, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                prompt: "Place a barcode inside the scan area", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true, // iOS
                disableSuccessBeep: false // iOS
            };

        BarcodeScanner.scan(options)
            .then((data) => {
                this.barcodeData = data;
                let alert = this.alertCtrl.create({
                    title: 'Scan Results',
                    subTitle: data.text,
                    buttons: ['OK']
                });
                alert.present();
            }).catch((err) => {
                let alert = this.alertCtrl.create({
                    title: 'Attention!',
                    subTitle: err,
                    buttons: ['Close']
                });
                alert.present();
            });
    }
}
