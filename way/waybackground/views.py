# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def index(request):
    return render(request, 'index.html')

#定制流程展示
def process_add(request):
    return render(request, 'process.html')
@csrf_exempt
def process_addresult(request):
    print "11111111"
    # step = request.POST['step_content1']
    # print step
    # array = request.POST.getlist('proList')
    # print array
    if request.is_ajax():
        print "is ajax"
        if request.method == 'POST':
            print "ids bef"
            array = request.POST.getlist('proList')
            print array

    return HttpResponse('{"status":"success"}', content_type='application/json')
