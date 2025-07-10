// importa as funcionalidades básicas do Angular e do Forms
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Módulo para usar os if else e for do angular exemplo: *ngIf e *ngFor
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Ferramentas do formulário reativo

// declaracao do componente standalone (sem precisar de module.ts separado)
@Component({
  selector: 'app-formulario', // Nome da tag que será usada no HTML, ex: <app-formulario>
  standalone: true, // indica que esse componente nao precisa de um módulo
  imports: [CommonModule, ReactiveFormsModule], // Importa as ferramentas que esse componente vai usar
  templateUrl: './formulario.html', // arquivo HTML separado
  styleUrls: ['./formulario.scss'], // estilo separado (opcional)
})
export class FormularioComponent {
  
  // declara o formulario do tipo FormGroup, que representa um conjunto de campos "inputs"
  form: FormGroup;

  // variavel que controla se a primeira etapa - email e senha - já foi validada
  step1Done = false;

  // Construtor - o Angular entrega o FormBuilder pra gente usar e montar o formulário
  // Isso se chama injeçao de dependencias
  // o angular automaticamente cria um FormBuilder (uma ferramenta que ajuda a criar formularios reativos)

  
  constructor(private formBuilder: FormBuilder) {

    // criacao do formulario e configuracao dos campos e suas validacoes
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // campo email obrigatorio e no formato de e-mail
      senha: ['', [Validators.required, Validators.minLength(6)]], // campo senha obrigatorio e minimo 6 caracteres
      nome: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]], // nome só letras
      idade: [{ value: '', disabled: true }, [Validators.required, Validators.min(1), Validators.max(130)]], // idade entre 1 e 130
    });
  }

  // funçao que retorna mensagens de erro personalizadas dependendo do campo
  getErrorMessage(field: string): string | null {
    const control = this.form.get(field); // pega o controle (campo) do formulario
    if (!control || !control.touched) return null; // só mostra erro se o campo foi tocado (o usuario interagiu)

    // validacoes genericas e especificas:
    if (control.hasError('required')) return 'Campo obrigatório';
    if (field === 'email' && control.hasError('email')) return 'Email inválido';
    if (field === 'senha' && control.hasError('minlength')) return 'Senha deve ter no mínimo 6 caracteres';
    if (field === 'nome' && control.hasError('pattern')) return 'Nome deve conter apenas letras';
    if (field === 'idade') {
      if (control.hasError('min')) return 'Idade deve ser maior que 0';
      if (control.hasError('max')) return 'Idade deve ser menor que 130';
    }

    return null; // se nao tiver erro, retorna nulo
  }

  // funcao executada quando o botao "avançar" é clicado
  onSubmit() {

    // primeira etapa  - validar email e senha
    if (!this.step1Done) {
      // marca ambos como "tocados" para exibir os erros, caso existam
      this.form.get('email')?.markAsTouched();
      this.form.get('senha')?.markAsTouched();

      // se os dois estiverem válidos:
      if (this.form.get('email')?.valid && this.form.get('senha')?.valid) {
        // desativa os campos email e senha (não pode editar mais)
        this.form.get('email')?.disable();
        this.form.get('senha')?.disable();

        // ativa os campos nome e idade
        this.form.get('nome')?.enable();
        this.form.get('idade')?.enable();

        // marca que a primeira etapa foi concluída
        this.step1Done = true;
      }

    // segudna etapa - validar nome e idade
    } else {
      // marca ambos como "tocados" para exibir os erros, caso existam
      this.form.get('nome')?.markAsTouched();
      this.form.get('idade')?.markAsTouched();

      // se os dois estiverem válidos:
      if (this.form.get('nome')?.valid && this.form.get('idade')?.valid) {
        // exibe um alert com os valores preenchidos no formulario
        alert(
          `Dados:\nEmail: ${this.form.get('email')?.value}\nSenha: ${this.form.get('senha')?.value}\nNome: ${this.form.get('nome')?.value}\nIdade: ${this.form.get('idade')?.value}`
        );
      }
    }
  }

}
