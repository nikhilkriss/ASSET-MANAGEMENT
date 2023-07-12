<LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          name="purchaseDate"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Purchase Date"
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "30px",
                      width: "180px",
                      marginBottom: "0px",
                    },
                  }}
                />
              )}
              inputFormat="yyyy/MM/dd"
            />
          )}
        />
      </LocalizationProvider>