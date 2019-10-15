import React from 'react';
import Swal from 'sweetAlert2'

Swal.fire({
  title: 'Are you sure?',
  text: "This is to confirm your entry",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#008000',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, save it!'
}).then((result) => {
  if (result.value) {
    Swal.fire(
      'Saved!',
      'Your entry has been saved.',
      'success'
    )
  }
})


export default DriverViewModal;