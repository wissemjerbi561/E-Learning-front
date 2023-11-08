import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MrBototService } from 'src/app/services/mr-botot.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mr-bot',
  templateUrl: './mr-bot.component.html',
  styleUrls: ['./mr-bot.component.css']
})
export class MrBotComponent {
  userMessage: string = '';
  botResponse: string = '';


  message: string = '';
  chatLogs: string[] = [];
  chatbotResponse:  any;
  constructor(private http: HttpClient,private mrBotService:MrBototService) { }

  ngOnInit(): void {

 
  }


  sendMessage() {
    this.mrBotService.sendMessage(this.userMessage).subscribe(
      (response: any) => {
        this.botResponse = response.response;
        var str =  this.botResponse; 
        var splitted = str.split("\n"); 
        console.log(splitted)
        console.log('reponse=',response)
        this.chatbotResponse = splitted;
        this.chatLogs.push(`Chatbot: ${splitted}`);
        //this.getChatbotResponse();
      },
      error => {
        console.error('Error:', error);
      }
    );
    this.message = '';
  }
  getVoiceResponse() {
    this.mrBotService.getVoiceResponse().subscribe(
      (response: any) => {
        this.userMessage = response.response;
      },
      (error) => {
        // Gérer les erreurs si nécessaire
      }
    );
  }
}

  /*onSendMessage() {
    if (this.message.trim() !== '') {
      this.chatLogs.push(`You: ${this.message}`);
      this.mrBotService.sendMessage(this.message).subscribe(
        response => {
          console.log('reponse=',response)
          this.chatbotResponse = response;
          this.chatLogs.push(`Chatbot: ${response}`);
          //this.getChatbotResponse();
        },
        error => {
          console.error('Error:', error);
        }
      );
      this.message = '';
    }
  }



  sendMessageToBackend(message: string) {
    const url = environment.urlBotBack+'/get_response';
    return this.http.post(url, { message });
  }*/


