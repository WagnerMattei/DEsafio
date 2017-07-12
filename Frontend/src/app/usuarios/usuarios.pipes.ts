import { Pipe, PipeTransform } from '@angular/core';


@Pipe(
{
    name: 'filterName',
})

export class FilterName implements PipeTransform
{
    transform(usuarios, text)
    {
        return usuarios.filter( usuarios => usuarios.nome.toLowerCase().includes(text.toLowerCase() ) );
    }
}
