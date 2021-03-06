"""way URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from waybackground.views import *

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^index/$', index,name='index'),
    url(r'^login/$', login,name='login'),
    url(r'^log/$', log, name='log'),
    url(r'^customer_register/$', customer_register,name='customer_register'),
    url(r'^check_username/$', check_username,name='check_username'),
    url(r'^process_add/$', process_add,name='process_add'),
    url(r'^process_addresult/$', process_addresult,name='process_addresult'),
    url(r'^process_show/$', process_show,name='process_show'),
    url(r'^customer_add/$', customer_add,name='customer_add'),
    url(r'^customer_add_result/$', customer_add_result,name='customer_add_result'),
    url(r'^customer_show/$', customer_show,name='customer_show'),
    url(r'^customer_edit/$', customer_edit,name='customer_edit'),
    url(r'^role_show/$', role_show,name='role_show'),
    url(r'^role_add/$', role_add, name='role_add'),
    url(r'^role_add_do/$', role_add_do, name='role_add_do'),
    url(r'^role_edit/$', role_edit, name='role_edit'),
    url(r'^role_edit_do/$', role_edit_do, name='role_edit_do'),
    url(r'^role_delete_do/$', role_delete_do, name='role_delete_do'),

]
