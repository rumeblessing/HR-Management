import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
 baseUrl: string = 'https://localhost:7120/api/';
 private apiKey = 'Lgc8BnGeKQff8DvZxLibaZEsnl5sGqX4';
 private apiUrl = `https://calendarific.com/api/v2/holidays?api_key=Lgc8BnGeKQff8DvZxLibaZEsnl5sGqX4&country=NG&year=2024&type=national`;
 private apiUrll = `https://calendarific.com/api/v2/holidays?api_key=Lgc8BnGeKQff8DvZxLibaZEsnl5sGqX4&country=NG&year=2024`;
 private TransaltionapiKey = 'AIzaSyC9FREfiz3n9WQQrVkUn25jIyXAiAPh07s';
  private url = `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`;
private translationUrl =  'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';

 

  constructor(public http: HttpClient) {
    
   }
   public data: any;
   public users: any;

   setData(data: any){
     this.data = data;
   }
 
   getData(){
     let temp = this.data;
     this.clearData();
     return temp;
   }
   setUsers(users: any[]): void {
    this.users = users;
  }

  getUsers(): any[] {
    return this.users;
  }
 
   clearData(){
     this.data = undefined;
   }
 
  createUser(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}UserLoginInformation/CreateUser`, data)
      }

          loginUser(Email: string,Password:string): Observable<string>{
            const url = `${this.baseUrl}UserLoginInformation/GetUser?email=${Email}&password=${Password}`
            return this.http.get<string>(url)
          }
          AddDepartment(data: any): Observable<string>{
            const url = `${this.baseUrl}UserDepartment`
            return this.http.post<string>(url, data)
          }
          GetAllUsers(): Observable<string>{
            const url = `${this.baseUrl}UserLoginInformation/GetAllUsers`
            return this.http.get<string>(url)
          }
          GetAllDepartment(): Observable<string>{
            const url = `${this.baseUrl}UserDepartment/Getalldepartmentt`
            return this.http.get<string>(url)
          }
          getHolidays(): Observable<any> {
            return this.http.get(this.apiUrl);
          }
          getEvents(): Observable<any> {
            return this.http.get(this.apiUrll);
          }
          ApplyLeave(data: any): Observable<string>{
            const url = `${this.baseUrl}LeaveApplication/SubmitLeave`
            return this.http.post<string>(url, data)
          }

          translate(text: string, targetLanguage: string): Observable<any> {
            const body = [{ Text: text }];
            const headers = new HttpHeaders({
              'Ocp-Apim-Subscription-Key': 'YOUR_API_KEY',
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Region': 'YOUR_RESOURCE_REGION'
            });
        
            return this.http.post(`${this.apiUrl}&to=${targetLanguage}`, body, { headers });
          }
        
}
