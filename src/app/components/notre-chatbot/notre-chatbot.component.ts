import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotreChatbotService } from 'src/app/services/notre-chatbot.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notre-chatbot',
  templateUrl: './notre-chatbot.component.html',
  styleUrls: ['./notre-chatbot.component.css']
})
export class NotreChatbotComponent implements OnInit {
  message: string = '';
  chatLogs: string[] = [];
  chatbotResponse: string = '';
  constructor(private http: HttpClient,private chatbotService:NotreChatbotService) { }

  ngOnInit(): void {
    /*const sendBtn = document.getElementById('sendbtn')!;
    const messageInput = document.getElementById('chatinput') as HTMLInputElement;
    const chatLogs = document.getElementById('chatlogs');

    if (sendBtn && messageInput && chatLogs) {
      sendBtn.addEventListener('click', () => {
        const message = messageInput.value;
        messageInput.value = '';

        if (message !== '') {
          const selfChat = document.createElement('div');
          selfChat.className = 'chat self';
          selfChat.innerHTML = `
            <div class="user-photo"></div>
            <p class="chat-message">${message}</p>
          `;
          chatLogs.appendChild(selfChat);

          this.sendMessageToBackend(message).subscribe(response => {
            const friendChat = document.createElement('div');
            friendChat.className = 'chat friend';
            friendChat.innerHTML = `
              <div class="user-photo"></div>
              <p class="chat-message">${response}</p>
            `;
            chatLogs.appendChild(friendChat);
          });
        }
      });
    }*/
  }

  onSendMessage() {
    if (this.message.trim() !== '') {
      this.chatLogs.push(`You: ${this.message}`);
      this.chatbotService.sendMessage(this.message).subscribe(
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

  /*getChatbotResponse() {
    this.chatbotService.getChatbotResponse().subscribe(
      response => {
        this.chatbotResponse = response
        console.log('response',response);
        this.chatLogs.push(`Chatbot: ${response}`);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }*/

  sendMessageToBackend(message: string) {
    const url = environment.urlBotBack+'/get_response';
    return this.http.post(url, { message });
  }
  
}
