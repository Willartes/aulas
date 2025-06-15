<?php
  /**
 * Formulário de Contato - Aulas Particulares
 * Configurado para envio via SMTP Gmail
 */

 // Configurações UTF-8
  header('Content-Type: text/html; charset=UTF-8');
  mb_internal_encoding('UTF-8');
  mb_http_output('UTF-8');
  mb_regex_encoding('UTF-8');
  ini_set('default_charset', 'UTF-8');


// Configurações de erro e timezone
  $receiving_email_address = 'willartes@gmail.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  $contact->charset = 'UTF-8';


  date_default_timezone_set("America/Sao_Paulo");
  $data_envio = date('d/m/Y');
  $hora_envio = date('H:i:s');

  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  $contact->smtp = array(
      'host' => 'smtp.gmail.com',
      'username' => 'willartes@gmail.com',
      'password' => 'vapn refr bqow augd',
      'port' => '587'
  );

  $contact->add_message($_POST['name'], 'Nome');
  $contact->add_message($_POST['email'], 'Email');
  $contact->add_message($_POST['phone'], 'Telefone');
  $contact->add_message($_POST['subject'], 'Assunto', 5);
  $contact->add_message($_POST['message'], 'Mensagem', 5);
  $contact->add_message($data_envio, 'Data de envio');
  $contact->add_message($hora_envio, 'Hora do envio');

  echo $contact->send();
?>