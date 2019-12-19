import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from "../shared/frase.model"
import { FRASES } from "./frases-mock"

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {


  public frases: Frase[] = FRASES
  public instrucao: string = "Traduza a frase"
  public resposta: string = ""
  public respostaErrada: string = ""

  public rodada: number = 0
  public rodadaFrase: Frase

  public progresso: number = 0

  public tentativas: number = 3

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    //console.log("componente destruido")
  }

  public atualizaResposta(resposta: Event): void{
    //.trim() remove os espaços brancos fora da string
    this.resposta = (<HTMLInputElement>resposta.target).value.trim()
    //console.log(this.resposta)
  }

  public verificarResposta(): void{
    
    //resposta = valor do textarea 
    if(this.rodadaFrase.frasePtBr == this.resposta){
      //limpa o campo de resposta errada
      this.respostaErrada = ""

      //trocar pergunta da rodada
      this.rodada++

      //progresso
      this.progresso += (100 / this.frases.length)
      //console.log(this.progresso)

      //
      if(this.rodada === 5){
        this.encerrarJogo.emit("vitoria")
      }

      //atualiza o objeto rodadaFrase
      this.atualizaRodada()

    }else{
      this.tentativas--
      
      this.respostaErrada = "Resposta errada"

      if(this.tentativas === -1){
        this.encerrarJogo.emit("derrota")
      }
    }
  }

  public atualizaRodada(): void{
    //define a frase da rodada com base em alguma lógica
    this.rodadaFrase = this.frases[this.rodada]
    //limpa a resposta
    this.resposta = ""
  }

}
