from django import template
import ast
import string

register = template.Library()


@register.inclusion_tag('component.html')
def component(name, data="", html_options=""):
    try:
        html_options = ast.literal_eval(html_options)
    except SyntaxError:
        html_options = {}

    try:
        data = ast.literal_eval(data)
    except SyntaxError:
        data = {}

    data_attrs = {
        **data,
        **{'data-component-name': name}
    }

    class_name = ' '.join([
        'rg-component',
        html_options.get('class', '')
    ]).strip()

    return {
        'attrs': to_html_attrs({
            **{'class': class_name},
            **data_attrs,
            **html_options
        })
    }


def to_html_attrs(attributes={}):
    if attributes != {}:
        return ' '.join(
            map(lambda kv: f'{kv[0]}="{kv[1]}"', attributes.items())
        )
    else:
        return ''
