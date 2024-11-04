$(document).on('click', '#test', async () => {
  const html = await $.get('/index');
  $('#modal-content').html(html);
});
