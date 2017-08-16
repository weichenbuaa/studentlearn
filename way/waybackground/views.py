# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import time
from waybackground.models import *

# Create your views here.

def index(request):
    return render(request, 'index.html')

#定制流程展示
def process_add(request):
    return render(request, 'process.html')
@csrf_exempt
def process_addresult(request):
    if request.is_ajax() and request.method == 'POST':
        proList = request.POST.getlist('proList')

        for i in range(len(proList)):
            if(0==i%2):
                #print proList[i]
                # 值是process
                pro = CustomProcess.objects.filter(rank=i/2+1)
                # 查找是否已经存在，
                nowTime = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
                if (1==len(pro)):
                    CustomProcess.objects.filter(rank=i/2+1).update(step=proList[i],rank=i/2+1,content=proList[i+1],
                                                                         status=0,update_time=nowTime)
                elif(0==len(pro)):
                    create_process = CustomProcess(step=proList[i], rank=i/2+1,content=proList[i+1],
                                                   status=0, create_time=nowTime)
                    create_process.save()
                    # 不存在，添加数据。
            else:
                print proList[i]

    return HttpResponse('{"status":"success"}', content_type='application/json')
