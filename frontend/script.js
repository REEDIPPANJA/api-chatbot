const btn=document.querySelector('#btn')
const url= "https://api-chatbot-1-uvt1.onrender.com"; 




function addEle(ClassName,data){
  const div=document.createElement('div');
  div.className=ClassName;
 
  const input=document.createElement('p');
  input.id="userPrompt";
  input.textContent=data;

  const userImage = document.createElement('img');
  userImage.src = 'user.png';
  userImage.alt = '';
  userImage.height = 50;

div.appendChild(input);
div.appendChild(userImage);

document.querySelector('.chat-conatiner').appendChild(div);
};




function loading(){
  const div=document.createElement('div');
  div.className='ai-chatbox';

const userImage = document.createElement('img');
userImage.src = 'ai.png';
userImage.alt = '';
userImage.height = 50;

const userImage2 = document.createElement('img');
userImage2.src = 'load.gif';
userImage2.alt = '';
userImage2.height = 50;
userImage2.className='loadingImg'


div.appendChild(userImage);
div.appendChild(userImage2);

document.querySelector('.chat-conatiner').appendChild(div);
}


async function datafetching(userInput){
    try{
        let data=await fetch(url,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                contents: [
                    {"parts":[{text:userInput}]}
                ]

            })
        });
    let dataResponse=await data.json();
   
    const text=dataResponse?.candidates[0].content.parts[0].text;
    console.log(text)
    createrespose(text);
    }
    catch(error){
        console.log(error);

    }
    
}


function createrespose(text){
    const LastDiv=document.querySelector('.ai-chatbox:last-child');
    const delChild=LastDiv.querySelector('.loadingImg');
    LastDiv.removeChild(delChild);

 const input=document.createElement('p');
  input.id="aiPrompt";
  input.textContent=text;

  LastDiv.appendChild(input);

}


btn.addEventListener('click',()=>{
    document.querySelector('.heading').style.display='none';
    let userInput=document.querySelector('#input-box').value.trim();
    if(!userInput){
        alert("enter a valid prompt");
        return;
    }
    console.log(userInput);
    addEle('user-chatbox',userInput);
    document.querySelector('#input-box').value="";
    setTimeout(loading,300);
   
    datafetching(userInput)
    


})