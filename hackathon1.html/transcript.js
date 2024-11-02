const selectInputLang = document.getElementById("selectInputLang"),
    selectOutputLang = document.getElementById("selectOutputLang"),
    inputText = document.getElementById("inputText"),
    outputText = document.getElementById("outputText"),
    inputChar = document.getElementById("inputChar");

    const APIUrl = "https://translate-plus.p.rapidapi.com/",
    APIKey = "e7dedd9196msh5201dea1cdbf1bap108e07jsn61f328994ad5",
    APIHost = "translate-plus.p.rapidapi.com",
    headers={
        "content-type":"application/json",
        'X-RapidAPI-key': APIKey,
        'X-RapidAPI-Host': APIHost,
    };

    getAllLanguagesList();

    function getAllLanguagesList(){
        const options={
            method:"GET",
            headers:headers,
        }

        try{
           fetch(APIUrl,options)
           .then((response) => response.json())
           .then((data) => {
                Object.entries(data.supported_languages).forEach(([key, value])=>{
                    let option1 = document.createElement("option");
                    option1.value=value;
                    option1.text=key;
                    selectInputLang.append(option1);
                if (value != "auto") {
                    let option2 = document.createElement("option");
                    option2.value=value;
                    option2.text=key;
                    selectOutputLang.append(option2);
                }
                });
           }); 
        } catch (error) {
            console.log(error);
        }
    }

    inputText.addEventListener("keyup", (e) =>{
        if (e.target.value.length > 5000){
            inputText.value = inputText.value.slice(0, 5000);
        }
        inputChar.innerText=e.target.value.length;
    });

    inputText.addEventListener("blur", (e) =>{
        if(e.target.value.length>0 && e.target.value!=""){
            const options = {
                method: "POST",
                headers,headers,
                body:JSON.stringify({
                    text:e.target.value,
                }),
            };
            try{
                fetch(APIUrl+"language_detect",options)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                }); 
             } catch (error) {
                 console.log(error);
             }
        }
    });
    