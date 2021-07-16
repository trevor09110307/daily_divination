document.addEventListener('DOMContentLoaded',function()
{   
    var user = document.querySelector('.user_input') ///讓下面的函數都能抓到此變數
    var today = new Date()
    var storage = sessionStorage
    // --------------
    
    document.querySelector('#user_data .date span').textContent = today.toLocaleDateString()  


    //使用者名稱登入    
    document.querySelector('.login_btn').addEventListener('click',function(){
        if(user.value === ""){
            window.alert('請輸入姓名')
        } else{
            document.querySelector('#user_data .user span').textContent = user.value
            user.style.display = 'none'
            this.style.display = 'none'        
        } 
    },false)

    
    //處理水晶球按鈕,開始占卜
    document.querySelector('.start').addEventListener('click',function(){

                
        var key_arr = []

        //把storage裡面的key值存入key_arr陣列
        storage.removeItem('IsThisFirstTime_Log_From_LiveServer')

        for(i = 0,len = storage.length;i < len;i++){
            key_arr.push(storage.key(i)) 
        } 

        
        //輸入欄為空值為空值的處理+數入欄的值與storage的值做比對判斷是否的使用過占卜
        if(user.value === ''){
            alert('請先至左上角輸入姓名')
        } else if(key_arr.indexOf(user.value) !== -1){
            alert('今日已經占卜過了')
            window.location.reload();
        } else{
            storage.setItem(user.value,'已占卜')
            this.textContent = '占卜中'
            this.style.textShadow = '5px 5px 7px #204458'
            var light = document.querySelector('#wizard .light')

            //點擊開始後的球體轉動動畫&球體後面的光芒閃耀的動畫
            light.style.opacity = '100%'
            light.style.transform = 'rotate(45deg) scale(1.5)'
            var ball = document.querySelector('.ball_img')
            var classes = ball.className.split(' ')
            var index = classes.indexOf('turn360')
            classes.push('turn360') 
            ball.className = classes.join(' ')

            
            //點擊開始後,為了防止使用者在動畫執行期間再次點擊開始，製造一個透明div擋在整個wizard前面
            var wizard_block = document.createElement('div')
            wizard_block.className = ('wizard_block')
            document.getElementById('wizard').appendChild(wizard_block)

            //隨機產生星星數
            

            setTimeout(function(){
                var work_random = (Math.floor(Math.random()*5))+1
                var love_random = (Math.floor(Math.random()*5))+1
                var money_random = (Math.floor(Math.random()*5))+1
                var workStar = document.getElementsByClassName('work')
                var loveStar = document.getElementsByClassName('love')
                var moneyStar = document.getElementsByClassName('money')
                for(i = 0 ; i < work_random ; i++){
                    var _workStar = workStar[i]
                    _workStar.style.paddingTop = '5%'
                }    
                for(i = 0 ; i < love_random ; i++){
                    var _loveStar = loveStar[i]
                    _loveStar.style.paddingTop = '5%'
                }   
                for(i = 0 ; i < money_random ; i++){
                    var _moneyStar = moneyStar[i]
                    _moneyStar.style.paddingTop = '5%'
                }   
            },3000)   ///執行速度與下面display的2900毫秒一樣

            // --------------------------------------------
            setTimeout(function(){
                var result = document.getElementById('result')
                result.style.display = 'block'
            },2900)  
            }             
    },false)



    // 處理占卜結果的下一步按鈕事件
    document.getElementById('btn_next').addEventListener('click',function(){
        var content01 = document.querySelector('#result_content .content01')
        var content02 = document.querySelector('#result_content .content02')
        var time_countdown = ''

        //滑入第二畫面
        content01.style.left = '-100%'
        content02.style.left = '0'

        //隨機占卜圖滑入
        var img01 = document.querySelector('.img_item01')
        var img02 = document.querySelector('.img_item02')
        var img03 = document.querySelector('.img_item03')
        var colorimg = ['img/color/black.png','img/color/blue.png','img/color/white.png','img/color/yellow.png']
        var directionimg = ['img/direction/east.png','img/direction/south.png','img/direction/west.png','img/direction/north.png']
        var numberimg = ['img/number/0.png','img/number/1.png','img/number/2.png','img/number/3.png','img/number/4.png','img/number/5.png','img/number/6.png','img/number/7.png','img/number/8.png','img/number/9.png']

        var color_key = (Math.floor(Math.random()*4))//0~3
        var direction_key = (Math.floor(Math.random()*4))//0~3
        var number_key = (Math.floor(Math.random()*10))//0~9

        var img_color = document.createElement('img')
        img_color.src = colorimg[color_key]
        img01.appendChild(img_color)
        

        var img_direction = document.createElement('img')
        img_direction.src = directionimg[direction_key]
        img02.appendChild(img_direction)

        var img_number = document.createElement('img')
        img_number.src = numberimg[number_key]
        img03.appendChild(img_number)

        setTimeout(() => {
            img_color.style.left = '10%'
            img_direction.style.left = '10%'
            img_number.style.left = '10%'
        }, 0);

        //每日倒數計時
        // setInterval(() => {
            
        // }, 500)       

        //按下<完成>按鈕,把倒數計時顯示在首頁左側
        var finish_btn = document.getElementById('btn_finish')
        finish_btn.addEventListener('click',function(){
           
            var timecount_data = document.createElement('p')
            timecount_data.className = 'timecount_data'
                       
            setInterval(() => {              
                var date = new Date()
                var nowhour = date.getHours() 
                var nowminute = date.getMinutes()            
                var nowsecond = date.getSeconds()
                var targethour = 23
                var targetminute = 59
                var targetsecond = 59

                time_countdown = (targethour - nowhour) + ':' + (targetminute - nowminute) + ':' + (targetsecond - nowsecond)

                if(time_countdown === '0:0:0'){
                    window.location.reload();
                    storage.clear();
                }
                    document.querySelector('.timecount_data').textContent = '距離下次占卜還有' + time_countdown
                }, 1000);     
                
                
                var text = document.createTextNode('距離明日占卜還有' + time_countdown) 
                timecount_data.appendChild(text)
                document.getElementById('user_data').appendChild(timecount_data)
                
                //將result關掉
                document.getElementById('result').style.display = 'none'

                //將水晶球的字自"占卜中"改成""完成"
                var star_btn = document.querySelector('.start')
                star_btn.textContent = '完成'
                
                // var wizard_block = document.createElement('div')
                // wizard_block.className = ('wizard_block')
                // document.getElementById('wizard').appendChild(wizard_block)
        },false)

    },false)
},false)