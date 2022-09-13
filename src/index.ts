import { readFileSync, writeFileSync } from 'fs';
const caracteresEspeciais = "~!#$%^&*()_+,./|\\`-=<>?{}[]:\";: ".split("");
const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVXYZW".split('');
const letrasMinusculas = "abcdefghijklmnopqrstuvxyzw".split('');
const numeros = "1234567890".split('');
const numerosECaracteresEspeciais = numeros.concat(caracteresEspeciais);
const letrasMinusculasNumerosECaracteresEspeciais = letrasMinusculas.concat(numeros,caracteresEspeciais);
const letrasECaracteresEspeciais = letrasMaiusculas.concat(letrasMinusculas,caracteresEspeciais);
const nomeArquivoSenhas = process.argv.slice(2)[0];
const nomeArquivoSaida = process.argv.slice(2)[1];

if(nomeArquivoSenhas) {   
    const novasSenhas = readFileSync(nomeArquivoSenhas).toString().split('\n').map(senha => {
        if(senha.trim()) {
            let novaSenha = senha.trim()
            let alteracoesRestantes = 3
            let posicoesParaAlterar = Array.from({length: senha.length}, (e, i)=> i)
            while(alteracoesRestantes > 0) {
                if(!novaSenha.match(/[^a-zA-Z0-9]/gm)) { //Senha não tem caracter especial
                        let posicaoAlterar = posicoesParaAlterar[Math.floor(Math.random() * (posicoesParaAlterar.length-1))];
                        posicoesParaAlterar.splice(posicoesParaAlterar.indexOf(posicaoAlterar),1);
                        //Adiciona um caracter especial em qualquer posição, exceto a última
                        novaSenha = novaSenha.substring(0,posicaoAlterar) + 
                                    caracteresEspeciais[Math.floor(Math.random() * caracteresEspeciais.length)] +
                                    novaSenha.substring(posicaoAlterar+1);
                        alteracoesRestantes--;
                        continue;
    
                }
                if(!novaSenha.match(/[A-Z]/gm)) { //Senha não tem letra maiuscula
                        let posicaoAlterar = posicoesParaAlterar.slice(1)[Math.floor(Math.random() * (posicoesParaAlterar.length-1))];
                        posicoesParaAlterar.splice(posicoesParaAlterar.indexOf(posicaoAlterar),1);
                        //Adiciona uma letra maiuscula em qualquer posicao, exceto a primeira
                        novaSenha = novaSenha.substring(0,posicaoAlterar) + 
                                    letrasMaiusculas[Math.floor(Math.random() * letrasMaiusculas.length)] +
                                    novaSenha.substring(posicaoAlterar+1);
                        alteracoesRestantes--;
                        continue;
    
                }
                if(novaSenha.match(/^[a-zA-Z]+[^a-zA-Z0-9]$/gm)) { //A senha é uma sequencia de letras seguida de um caracter especial. Ex.: password_
                    let posicaoAlterar = posicoesParaAlterar[Math.floor(Math.random() * (posicoesParaAlterar.length-1))];
                    posicoesParaAlterar.splice(posicoesParaAlterar.indexOf(posicaoAlterar),1);
                    //Adiciona um número ou caracter especial em qualquer posição, exceto a última
                    novaSenha = novaSenha.substring(0,posicaoAlterar) + 
                                numerosECaracteresEspeciais[Math.floor(Math.random() * numerosECaracteresEspeciais.length)] +
                                novaSenha.substring(posicaoAlterar+1);
                    alteracoesRestantes--;
                    continue;
                }
                if(novaSenha.match(/^[A-Z]/gm)) { //A senha começa com uma letra maiuscula
                    //Troca o primeiro caracter (letra maiuscula) por uma letra minuscula, numero ou caracter especial
                    novaSenha = letrasMinusculasNumerosECaracteresEspeciais[Math.floor(Math.random() * letrasMinusculasNumerosECaracteresEspeciais.length)] +
                                novaSenha.substring(1);
                    alteracoesRestantes--;
                    continue;
                }
                if(novaSenha.match(/\d$/gm)) { //A senha termina com numeros
                    //Troca o ultimo caracter (numero) por uma letra maiuscula, minuscula ou caracter especial
                    novaSenha = novaSenha.substring(0,novaSenha.length - 1) +
                                letrasECaracteresEspeciais[Math.floor(Math.random() * letrasECaracteresEspeciais.length)]
                    alteracoesRestantes--;
                    continue;
                }
                break;
            }     
            return novaSenha;
        }


    })
    writeFileSync(nomeArquivoSaida ?? 'output.txt',novasSenhas.join('\n'),"utf8");

}

