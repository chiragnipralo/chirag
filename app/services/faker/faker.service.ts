import { Injectable } from '@angular/core';
// import * as faker from 'faker';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type AppLanguage = 'en' | 'ru';

export class ChatMessage {
  messageId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  toUserId: string;
  time: number | string;
  message: string;
  status: string;
}

export class UserInfo {
  id: string;
  name?: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FakerService {
  lang: AppLanguage;



  constructor(public http: HttpClient) { }

  // /**
  //  * Set lang
  //  * @param {AppLanguage} lang - The title of the book.
  //  */
  // setLang(lang: AppLanguage) {
  //   this.lang = lang;
  //   faker.setLocale(lang);
  // }

  // /**
  //  * Get Faker
  //  * @return {Promise<Faker.FakerStatic>}
  //  */
  // getFaker(): Promise<Faker.FakerStatic> {
  //   return new Promise((resolve) => {
  //     resolve(faker);
  //   });
  // }

  // generateUser(userId: string): Promise<any> {
  //   return new Promise((resolve) => {
  //     const user = {
  //       id: userId,
  //       first_name: faker.name.firstName(1),
  //       last_name: faker.name.lastName(1),
  //       avatar: faker.internet.avatar(),
  //     };
  //     resolve(user);
  //   });
  // }

  // generateChat(chatGroupLength: number, chatLength: number): Promise<any> {
  //   return new Promise((resolve) => {
  //     const chats = Array.apply(null, Array(chatGroupLength)).map(() => {
  //       const chat = {
  //         date: faker.date.weekday(),
  //         chats: [],
  //       };

  //       chat.chats = Array.apply(null, Array(chatLength)).map(() => {
  //         return {
  //           message: faker.lorem.sentences(
  //             faker.random.arrayElement([1, 2, 3])
  //           ),
  //           date: faker.date.recent(),
  //           avatar: faker.image.avatar(),
  //           type: faker.random.arrayElement(['user', 'me']),
  //         };
  //       });

  //       return chat;
  //     });

  //     resolve(chats);
  //   });
  // }

  mockNewMsg(msg) {
    const mockMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: '210000198410281948',
      userName: 'Hancock',
      userAvatar: './assets/to-user.jpg',
      toUserId: '140000198202211138',
      time: Date.now(),
      message: msg.message,
      status: 'success'
    };

    setTimeout(() => {
      // this.events.publish('chat:received', mockMsg, Date.now())
    }, Math.random() * 1800)
  }

  getMsgList(): Observable<ChatMessage[]> {
    const msgListUrl = './assets/mock/msg-list.json';
    return this.http.get<any>(msgListUrl)
      .pipe(map(response => response.array));
  }

  sendMsg(msg: ChatMessage) {
    return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
      .then(() => this.mockNewMsg(msg));
  }

  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      id: '140000198202211138',
      name: 'Luff',
      avatar: './assets/user.jpg'
    };
    return new Promise(resolve => resolve(userInfo));
  }


  getMockUserData() {
    return [
      {
        "messageId": "1",
        "userId": "140000198202211138",
        "userName": "Luff",
        "userImgUrl": "./assets/user.jpg",
        "toUserId": "210000198410281948",
        "toUserName": "Hancock",
        "userAvatar": "./assets/to-user.jpg",
        "time": 1488349800000,
        "message": "A good programmer is someone who always looks both ways before crossing a one-way street. ",
        "status": "success"

      },
      {
        "messageId": "2",
        "userId": "210000198410281948",
        "userName": "Hancock",
        "userImgUrl": "./assets/to-user.jpg",
        "toUserId": "140000198202211138",
        "toUserName": "Luff",
        "userAvatar": "./assets/user.jpg",
        "time": 1491034800000,
        "message": "Don’t worry if it doesn't work right. If everything did, you’d be out of a job.",
        "status": "success"
      },
      {
        "messageId": "3",
        "userId": "140000198202211138",
        "userName": "Luff",
        "userImgUrl": "./assets/user.jpg",
        "toUserId": "210000198410281948",
        "toUserName": "Hancock",
        "userAvatar": "./assets/to-user.jpg",
        "time": 1491034920000,
        "message": "Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris.",
        "status": "success"
      },
      {
        "messageId": "4",
        "userId": "210000198410281948",
        "userName": "Hancock",
        "userImgUrl": "./assets/to-user.jpg",
        "toUserId": "140000198202211138",
        "toUserName": "Luff",
        "userAvatar": "./assets/user.jpg",
        "time": 1491036720000,
        "message": "One man’s crappy software is another man’s full time job.",
        "status": "success"
      },
      {
        "messageId": "5",
        "userId": "210000198410281948",
        "userName": "Hancock",
        "userImgUrl": "./assets/to-user.jpg",
        "toUserId": "140000198202211138",
        "toUserName": "Luff",
        "userAvatar": "./assets/user.jpg",
        "time": 1491108720000,
        "message": "Programming is 10% science, 20% ingenuity, and 70% getting the ingenuity to work with the science.",
        "status": "success"
      },
      {
        "messageId": "6",
        "userId": "140000198202211138",
        "userName": "Luff",
        "userImgUrl": "./assets/user.jpg",
        "toUserId": "210000198410281948",
        "toUserName": "Hancock",
        "userAvatar": "./assets/to-user.jpg",
        "time": 1491231120000,
        "message": "If at first you don’t succeed, call it version 1.0",
        "status": "success"
      },
      {
        "messageId": "7",
        "userId": "140000198202211138",
        "userName": "Luff",
        "userImgUrl": "./assets/user.jpg",
        "toUserId": "210000198410281948",
        "toUserName": "Hancock",
        "userAvatar": "./assets/to-user.jpg",
        "time": 1491231150000,
        "message": "The <textarea> tag defines a multi-line text input control.\nA text area can hold an unlimited number of characters, and the text renders in a fixed-width font (usually Courier).\nThe size of a text area can be specified by the cols and rows attributes, or even better; through CSS' height and width properties.",
        "status": "success"
      }
    ]
  }


  GetChatList() {
    return [
      {
        "id": "5f081604-60d9-4830-a2df-c83e91671428",
        "first_name": "Cedric",
        "last_name": "Cartwright",
        "email": "Jamison.Weimann48@yahoo.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Enim error sit."
      },
      {
        "id": "51d11fb2-c1ca-4b74-a8f0-34ead2500dcc",
        "first_name": "Al",
        "last_name": "Funk",
        "email": "Davion_Glover@gmail.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Dolor exercitationem commodi."
      },
      {
        "id": "4228bd47-0584-489a-911b-9aee0891bc8b",
        "first_name": "Jerome",
        "last_name": "Gibson",
        "email": "Rozella56@gmail.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Voluptate accusantium commodi fugiat cum."
      },
      {
        "id": "84916f1f-f29c-43c5-b35d-c14093767b5a",
        "first_name": "Wilson",
        "last_name": "Schuppe",
        "email": "Oral.Bogan34@hotmail.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Reiciendis qui eveniet qui laborum ipsum qui."
      },
      {
        "id": "27ead155-e9a4-4802-b4c5-64acb1496452",
        "first_name": "Sherry",
        "last_name": "Friesen",
        "email": "Jerald_Gutkowski39@hotmail.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Suscipit libero aliquam omnis labore fugit sunt laudantium odio."
      },
      {
        "id": "d1003a83-b81e-438e-a004-98a2e2e2ae13",
        "first_name": "Debra",
        "last_name": "Lubowitz",
        "email": "Dedrick.Price88@yahoo.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Ad perspiciatis et nesciunt qui doloremque explicabo odio."
      },
      {
        "id": "73da757e-6e0a-4965-8c5d-fe318e6a1d49",
        "first_name": "Nathan",
        "last_name": "Pagac",
        "email": "Virgil70@gmail.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Et dicta sed qui nihil saepe et."
      },
      {
        "id": "fe80e588-c3b7-4d2b-8dd4-069c07a17b93",
        "first_name": "Wilbur",
        "last_name": "Wolff",
        "email": "Abraham9@hotmail.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Dolor dolor autem iste."
      },
      {
        "id": "a8ee22cd-5a13-485f-a95e-30d66f2c5a2d",
        "first_name": "Roosevelt",
        "last_name": "Morar",
        "email": "Estevan_Orn@yahoo.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Repellendus maxime atque et rem minus."
      },
      {
        "id": "3bc78aa4-0445-46f7-8544-88e7438e7811",
        "first_name": "Julio",
        "last_name": "DuBuque",
        "email": "Gennaro.Franecki@gmail.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Et officiis consectetur doloremque."
      },
      {
        "id": "cc3f876a-a570-474f-921e-9f40facd94e1",
        "first_name": "Kara",
        "last_name": "Watsica",
        "email": "Ryann_Langworth@gmail.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Perspiciatis dolores occaecati qui ad aliquid."
      },
      {
        "id": "1f67201c-cf44-4d0d-a470-050c9eda66ec",
        "first_name": "Loretta",
        "last_name": "Hermann",
        "email": "Alize.Will94@hotmail.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Tempora soluta in fugit sit repellendus."
      },
      {
        "id": "654368ff-c267-4f42-866f-7324d172bada",
        "first_name": "Russell",
        "last_name": "Bosco",
        "email": "Vivianne30@yahoo.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Expedita aut expedita et."
      },
      {
        "id": "62cb0934-84b9-4511-9ea8-f9d7c6baf125",
        "first_name": "Olga",
        "last_name": "Johns",
        "email": "Candida.Rice@yahoo.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Modi eos voluptatum unde natus."
      },
      {
        "id": "6165e4e1-66da-4cb8-865b-48083ed3e478",
        "first_name": "Rodolfo",
        "last_name": "Sawayn",
        "email": "Amir_Blanda90@yahoo.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Culpa et blanditiis aut non incidunt harum."
      },
      {
        "id": "ea3bbe17-f3a1-4ff0-aa7b-2ec04379a702",
        "first_name": "Robert",
        "last_name": "Jerde",
        "email": "Zora_Dickens50@yahoo.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Est illo illo dolorem culpa ipsa."
      },
      {
        "id": "dccb9aa2-6613-40f1-8956-ff7da52f5053",
        "first_name": "Lorenzo",
        "last_name": "Little",
        "email": "Tyrel.Boyer@gmail.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Nihil repudiandae sunt rem nostrum inventore."
      },
      {
        "id": "ae54d0b1-d714-4ce1-a1e1-b8f987f6d69d",
        "first_name": "Eleanor",
        "last_name": "Gislason",
        "email": "Jaquelin.Kuhn13@yahoo.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Et quasi deleniti veniam qui et sapiente mollitia."
      },
      {
        "id": "26fea7e8-ffb8-4898-b533-c0f3f648d63a",
        "first_name": "Oscar",
        "last_name": "Rodriguez",
        "email": "Magdalena50@gmail.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Rerum suscipit a veniam molestiae illo quas ut."
      },
      {
        "id": "392898ce-d51d-4af2-8537-1647b89e6fbf",
        "first_name": "Katie",
        "last_name": "Terry",
        "email": "Lyric.Wuckert@yahoo.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Voluptatem dolores quis."
      },
      {
        "id": "3c8b95de-df19-443e-bc62-27b3adb651a7",
        "first_name": "Aaron",
        "last_name": "Crooks",
        "email": "Loyce_Jacobson27@yahoo.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Aliquam modi fugit est odio."
      },
      {
        "id": "66a5f232-902a-48f9-af01-ed76b75d6b42",
        "first_name": "Roland",
        "last_name": "Bosco",
        "email": "Rhoda_White37@yahoo.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Eos consequatur hic sed libero."
      },
      {
        "id": "8aba6358-d7f9-4b98-a048-806c83bd4170",
        "first_name": "Lamar",
        "last_name": "Ziemann",
        "email": "Bobby49@yahoo.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Impedit quo aut dicta dolor."
      },
      {
        "id": "fe3c462c-f67c-4abf-8a79-acb93263c1d7",
        "first_name": "Diana",
        "last_name": "Goyette",
        "email": "Reggie63@hotmail.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Earum iste vero."
      },
      {
        "id": "55b11483-18dc-4127-82f9-536f750e13ab",
        "first_name": "Carlos",
        "last_name": "Jacobi",
        "email": "Laverna.Kassulke@yahoo.com",
        "avatar": "https://loremflickr.com/640/480?lock=1234",
        "last_message": "Labore deleniti quia quae consectetur nobis iure cumque error ea."
      }
    ]
  }
}
