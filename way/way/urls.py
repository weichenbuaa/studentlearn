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
    url(r'^process_add/$', process_add,name='process_add'),
    url(r'^process_addresult/$', process_addresult,name='process_addresult'),
    url(r'^process_show/$', process_show,name='process_show'),
    url(r'^customer_add/$', customer_add,name='customer_add'),
    url(r'^customer_add_result/$', customer_add_result,name='customer_add_result'),
    url(r'^customer_show/$', customer_show,name='customer_show'),
    url(r'^customer_edit/$', customer_edit,name='customer_edit'),
]
