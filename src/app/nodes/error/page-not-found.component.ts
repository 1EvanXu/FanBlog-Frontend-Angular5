import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="error-page-header">
          <img class="logo" src="../assets/logo.png">
    </div>
    <div class="error-container">
      <table cellspacing="0" cellpadding="0">
        <tr>
          <td>
            <table cellspacing="0" cellpadding="0">
              <tr>
                <td>
                  <h1><i class="anticon anticon-frown-o"></i> 404</h1>
                  <h3>Page Not Found!</h3>
                  <p>
                    <a [routerLink]="['/site']">Back to Home <i class="anticon anticon-arrow-right"></i></a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
    <footer>
      Evan.Xu © 2018 Powered By Angular5, NG-ZORRO
    </footer>
  `,
  styles: [`
    *{
      font-family:"Microsoft Yahei";
      margin:0;font-weight:lighter;
      text-decoration:none;
      text-align:center;
      line-height:2.2em;
    }
    h1 {
      font-size:100px;
      line-height:1em;
      color: #2D2D2D;
    }
    h3 {
      color: #2c2c2c;
    }
    table{
      width:100%;
      height:100%;
      border:0;
    }
    .error-container{
      margin-top: 17% ;
    }
    .logo {
      width: 130px;
      height: 40px;
      margin: 16px 30px 16px 50px;
      float: left;
    }
    .error-page-header {
      overflow: auto;
      display: block;
      border-bottom: 1px lightgray solid;
    }
    footer {
      text-align: center;
      width: 100%;
      position: absolute;
      bottom: 0px;
      left: 0px;
      height: 80px;
      padding: 20px;
    }
  `]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
