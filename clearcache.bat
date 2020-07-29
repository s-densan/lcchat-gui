set TARGET=.\node_modules\.cache\hard-source\*
del /S /Q %TARGET%
for /D %%1 in (%TARGET%) do rmdir /S /Q "%%1"