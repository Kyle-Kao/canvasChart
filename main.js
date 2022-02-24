let chart1 = {
  canvas: document.querySelector('#canvas1'),
  data: [
    {
      name: '指數',
      text: '30%',
      value: '0.30',
      color: '#ff3aab',
    },
    {
      name: '貴金屬',
      text: '19%',
      value: '0.19',
      color: '#42a3ed',
    },
    {
      name: '股票',
      text: '13%',
      value: '0.13',
      color: '#3cdd62',
    },
    {
      name: '能源',
      text: '22%',
      value: '0.22',
      color: '#ffff00',
    },
    {
      name: '外匯',
      text: '16%',
      value: '0.16',
      color: '#ffC000',
    },
  ],
};
let chart2 = {
  canvas: document.querySelector('#canvas2'),
  data: [
    {
      name: '指數',
      text: '22%',
      value: '0.22',
      color: '#ff3aab',
    },
    {
      name: '貴金屬',
      text: '28%',
      value: '0.28',
      color: '#42a3ed',
    },
    {
      name: '股票',
      text: '13%',
      value: '0.13',
      color: '#3cdd62',
    },
    {
      name: '能源',
      text: '20%',
      value: '0.20',
      color: '#ffff00',
    },
    {
      name: '外匯',
      text: '17%',
      value: '0.17',
      color: '#ffc000',
    },
  ],
};

class Chart {
  constructor(args) {
    let def = {
      ctx: args.canvas.getContext('2d'),
      w: (args.canvas.width = 800),
      h: (args.canvas.height = 380),
      // 起始角度順時針方向轉
      initAngle: -90,
      // 第一個扇形半徑
      middler: 100,
      datas: args.data,
    };
    Object.assign(this, def, args);
  }
  draw(donount) {
    for (var i = 0; i < this.data.length; i++) {
      // var angle = (360 / 10) *i
      var angle = this.data[i].value * 360;
      var startAngle = (this.initAngle * Math.PI) / 180;
      var endAngle = ((this.initAngle + angle) * Math.PI) / 180;
      let c = this.ctx;
      // -90*Math.PI/180
      //繪製圖形比例
      c.save();
      c.fillStyle = this.data[i].color;
      c.beginPath();
      // 先偏移150px
      c.translate(-150, 0);
      // 移至畫布中央
      c.moveTo(this.w / 2, this.h / 2);
      if (donount) {
        c.arc(this.w / 2, this.h / 2, 130, startAngle, endAngle);
      } else {
        c.arc(this.w / 2, this.h / 2, this.middler + i * 12, startAngle, endAngle);
      }
      c.closePath();
      c.fill();
      c.restore();
      this.initAngle += angle;
      // 顯示方塊
      c.save();
      c.fillStyle = this.data[i].color;
      c.beginPath();
      c.translate(this.w / 2 + 100, this.h / 2);
      // 一塊寬20px & 間隔20px
      c.fillRect(0, 40 * i, 20, 20);
      c.fill();
      c.restore();

      // 顯示數值
      c.save();
      c.font = '20px Microsoft Yahei';
      c.fillStyle = this.data[i].color;
      c.beginPath();
      // c.fillText(this.data[0].name, this.w / 2 + this.middler - 10, this.h / 2 - this.middler + 10);
      c.translate(this.w / 2 + 140, this.h / 2 + 18);
      c.fillText(this.data[i].name + ' ' + this.data[i].text, 0, 40 * i);
      c.restore();

      if (donount) {
        c.save();
        c.fillStyle = '#ffffff';
        c.beginPath();
        c.translate(-150, 0);
        c.moveTo(this.w / 2, this.h / 2);
        c.arc(this.w / 2, this.h / 2, 80, 0, (360 * Math.PI) / 180);
        c.fill();
        c.restore();
      }


    }
  }
}

function init() {
  let c = new Chart(chart1);
  let c2 = new Chart(chart2);
  c.draw();
  // true為甜甜圈型
  c2.draw(true);
}

window.addEventListener('load', () => {
  init();
});
