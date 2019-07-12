FactoryBot.define do
  factory :stock do
    data do
    end
    html_case_1 do
        <<-HTML_END
        <!DOCTYPE html>
        <html>
            <tr class="stockalllistbg1">
                <td>1</td>
                <td>2371</td>
                <td><a href="http://stock.wearn.com/a2371.html"><font size="3">大同</font></a></td>
                <td align="right">18.85&nbsp;&nbsp;</td>
                <td align="right">19.85&nbsp;&nbsp;</td>
                <td align="right">16.65&nbsp;&nbsp;</td>
                <td align="right">
                    18.35&nbsp;&nbsp;    </td>
                <td align="right">16.95&nbsp;&nbsp;</td>
                <td align="right"><font color="#0000FF">217,077&nbsp;&nbsp;</font></td>
                <td><table border="0" width="100%" style="border:none">
                    <tr>
                        <td style="font-size:13px;border:none">
                        <font color=#009900>▼</font>          </td>
                        <td style="border:none">
                        <font color=#009900>1.40</font></td>
                    </tr>
                    </table></td>
                <td align="right">-7.63%&nbsp;&nbsp;</td>
            </tr>
        </html>
        HTML_END
    end
    html_case_2 do
        <<-HTML_END
        <!DOCTYPE html>
        <html>
            <tr class="stockalllistbg1">
                <td>1</td>
                <td>2372</td>
                <td><a href="http://stock.wearn.com/a2371.html"><font size="3">大同</font></a></td>
                <td align="right">18.85&nbsp;&nbsp;</td>
                <td align="right">19.85&nbsp;&nbsp;</td>
                <td align="right">16.65&nbsp;&nbsp;</td>
                <td align="right">
                    18.35&nbsp;&nbsp;    </td>
                <td align="right">16.95&nbsp;&nbsp;</td>
                <td align="right"><font color="#0000FF">217,077&nbsp;&nbsp;</font></td>
                <td><table border="0" width="100%" style="border:none">
                    <tr>
                        <td style="font-size:13px;border:none">
                        <font color=#009900>▲</font>          </td>
                        <td style="border:none">
                        <font color=#009900>1.40</font></td>
                    </tr>
                    </table></td>
                <td align="right">-7.63%&nbsp;&nbsp;</td>
            </tr>
        </html>
        HTML_END
    end
    html_empty do
        <<-HTML_END
        <!DOCTYPE html>
        <html>
        </html>
        HTML_END
    end

  end
  factory :crawler do
    
  end
end