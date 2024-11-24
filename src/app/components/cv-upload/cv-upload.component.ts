import { Component } from '@angular/core';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-cv-upload',
  templateUrl: './cv-upload.component.html',
  styleUrls: ['./cv-upload.component.css'],
  standalone: true,
  imports: [NzUploadModule, NzButtonModule],
})
export class CvUploadComponent {
  uploading = false;
  fileList: any[] = [];

  constructor(private msg: NzMessageService, private router: Router) {}

  beforeUpload = (file: NzUploadFile): boolean => {
    const isPdfOrDocx =
      file.type === 'application/pdf' ||
      file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  
    if (!isPdfOrDocx) {
      this.msg.error('Yalnız PDF və ya DOCX faylları qəbul edilir!');
      return false;
    }
  
    const isLt5M = file.size! / 1024 / 1024 < 5;
  
    if (!isLt5M) {
      this.msg.error('Faylın ölçüsü 5MB-dan az olmalıdır!');
      return false;
    }
  
    this.fileList = [file];
    return false;
  };  

  handleUpload(): void {
    if (this.fileList.length === 0) {
      this.msg.error('Zəhmət olmasa fayl seçin!');
      return;
    }

    this.uploading = true;

    setTimeout(() => {
      this.uploading = false;
      this.msg.success('CV uğurla yükləndi!');
      this.router.navigate(['/confirmation']);
    }, 1500);
  }
}
