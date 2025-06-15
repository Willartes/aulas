<?php
  /**
 * Formulário de Contato - Aulas Particulares
 * Configurado para envio via SMTP Gmail
 */

// Configurações de erro e timezone
  $receiving_email_address = 'willartes@gmail.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = false;
  
  date_default_timezone_set("America/Sao_Paulo");
  $data_envio = date('d/m/Y');
  $hora_envio = date('H:i:s');
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->message = $_POST['phone'];
  $contact->subject = $_POST['subject'];
  

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  
  $contact->smtp = array(
    'host' => 'smtp.gmail.com',
    'username' => 'willartes@gmail.com',
    'password' => 'vapn refr bqow augd',//esta é a senha willartes
    //'password' => 'fqnmxgbnynxhlmno',//esta é a senha william.rodrigues
    'port' => '587'
  );
  /*Para liberar a senha de app é necessário ativar a verificação em 2 etapas no gerenciador de contas da google e gerar a senha*/ 

  $contact->add_message( $_POST['name'], 'From');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['phone'], 'phone');
  $contact->add_message( $_POST['subject'], 'Assunto', 5);
  $contact->add_message( $_POST['message'], 'Menssagem', 5);
  $contact->add_message( $data_envio, 'Data de envio');
  $contact->add_message( $hora_envio, 'Hora do envio');

  echo $contact->send();
?>
