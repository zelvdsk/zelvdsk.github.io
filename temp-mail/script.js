// tombol kembali
document.getElementById('back').addEventListener('click', () => {window.location.href = '#'});

// salin email
document.getElementById('salin').addEventListener('click', () => {
  try{
    navigator.clipboard.writeText(document.getElementById('email').value)
    alert('Berhasil menyalin alamat email.');
  } catch {
    alert('Gagal menyalin alamat email.');
  }
});

// hapus email
document.getElementById('hapus').addEventListener('click', () => {window.location.href = '/index.html'});

// waktu/jam
function time() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;

  var timeString = " | Waktu: " + hours + ":" + minutes;
  document.getElementById('waktu').innerText = timeString;
}
time();

var email = '';
// mengambil email
async function getEmail() {
  const reqEmail = await fetch('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1');
  const reqEmailResponse = await reqEmail.json();
  document.getElementById('email').value = reqEmailResponse[0];
  email = reqEmailResponse[0];
}
getEmail();

// refresh inbox button manual
document.getElementById('refresh').addEventListener('click', () => {
  var count = 1
  const name = email.split("@")[0]
  const domain = email.split("@")[1]

  async function getInbox() {
    let id = []
    const reqInbox = await fetch('https://www.1secmail.com/api/v1/?action=getMessages&login='+ name +'&domain='+ domain)
    const reqInboxResponse = await reqInbox.json()
    console.log(reqInboxResponse)
    alert('Refresh berhasil. pesan masuk: '+ reqInboxResponse.length)
    
    for(var i = 0; i < reqInboxResponse.length; i++) {
      let idc = reqInboxResponse[i]['id']
      if(reqInboxResponse[i].hasOwnProperty('id')) {
        if(!id.includes(idc)) {
          id.push(idc)
          console.log(id)
          const reqMsg = await fetch('https://www.1secmail.com/api/v1/?action=readMessage&login='+ name +'&domain='+ domain +'&id='+ idc)
          const reqMsgResponse = await reqMsg.json()
          console.log(reqMsgResponse)
          
          var msg = document.createElement('div')
          msg.className = 'message'

          var subj = document.createElement('b')
          subj.className = 'subject'
          subj.innerText = reqMsgResponse['subject']

          var head = document.createElement('div')
          head.className = 'headers'

          var send = document.createElement('p')
          send.className = 'sender'
          send.innerText = 'Dari: '+ reqMsgResponse['from'] +' | Waktu: '+ reqMsgResponse['date']

          var hr = document.createElement('hr')

          var cntn = document.createElement('div')
          cntn.className = 'content'

          var ped = document.createElement('p')
          ped.innerText = reqMsgResponse['textBody']

          msg.appendChild(subj)
          msg.appendChild(head)
          head.appendChild(send)
          msg.appendChild(hr)
          msg.appendChild(cntn)
          cntn.appendChild(ped)

          document.getElementById('mailbox').appendChild(msg)
        }
      }
    }
    
 
    //const reqMsg = await fetch('https://www.1secmail.com/api/v1/?action=readMessage&login='+ name +'&domain='+ domain +'&id='+ id)
    //const reqMsgResponse = await reqMsg.json()
  }
  getInbox()
})

